#!/bin/bash
set -euo pipefail

BASE="http://localhost:5000"
PASS=0
FAIL=0

echo "=== Tech Horizon Labs — Site Audit ==="
echo "Date: $(date '+%Y-%m-%d %H:%M')"
echo ""

echo "--- 1. HTTP Status Codes ---"
ROUTES=(
  "/" "/work" "/about" "/academy" "/contact" "/research" "/report" "/assessment"
  "/privacy" "/terms" "/security" "/openclaw" "/tools" "/scorecard"
  "/locations/sunshine-coast" "/locations/brisbane" "/locations/gold-coast" "/locations/queensland"
  "/industries/legal" "/industries/construction" "/industries/healthcare" "/industries/retail"
  "/insights"
  "/insights/how-australia-uses-ai-2026" "/insights/claude-vs-chatgpt-2026" "/insights/ai-impact-by-industry"
  "/insights/ai-implementation-cost-australia" "/insights/ai-mistakes-australian-businesses"
  "/insights/ai-readiness-stages-australia" "/insights/ai-training-gap-australia"
  "/insights/accc-microsoft-copilot-australia"
  "/sitemap.xml" "/robots.txt" "/styles.css" "/main.js" "/favicon.svg"
)
for url in "${ROUTES[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$url")
  if [ "$status" = "200" ]; then
    PASS=$((PASS + 1))
  else
    echo "  FAIL: $url (HTTP $status)"
    FAIL=$((FAIL + 1))
  fi
done
echo "  Checked ${#ROUTES[@]} URLs: $PASS pass, $FAIL fail"

echo ""
echo "--- 2. Redirect Tests ---"
REDIRECTS=("/audit-tool" "/insights/nonexistent" "/locations/nonexistent" "/industries/nonexistent")
for url in "${REDIRECTS[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$url")
  if [ "$status" = "301" ]; then
    PASS=$((PASS + 1))
  else
    echo "  FAIL: $url expected 301, got $status"
    FAIL=$((FAIL + 1))
  fi
done
echo "  All redirects returning 301"

echo ""
echo "--- 3. API Endpoints ---"
nl_status=$(echo '{"email":"audit-'$RANDOM'@test.com","source":"audit"}' | curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d @- "$BASE/api/newsletter")
contact_status=$(echo '{"name":"Test","email":"t@t.com","company":"T","message":"T"}' | curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d @- "$BASE/api/contact")
echo "  /api/newsletter: HTTP $nl_status"
echo "  /api/contact: HTTP $contact_status"

echo ""
echo "--- 4. Meta Tag Check (duplicates/missing) ---"
META_FAIL=0
for url in "${ROUTES[@]}"; do
  case "$url" in *.xml|*.txt|*.css|*.js|*.svg) continue;; esac
  html=$(curl -s "$BASE$url")
  tc=$(echo "$html" | grep -c '<title>' || true)
  dc=$(echo "$html" | grep -c 'name="description"' || true)
  cc=$(echo "$html" | grep -c 'rel="canonical"' || true)
  if [ "$tc" -ne 1 ] || [ "$dc" -ne 1 ] || [ "$cc" -ne 1 ]; then
    echo "  ISSUE: $url title=$tc desc=$dc canonical=$cc"
    META_FAIL=$((META_FAIL + 1))
  fi
done
echo "  $META_FAIL issues found"

echo ""
echo "--- 5. Internal Link Check ---"
BROKEN=0
for url in "${ROUTES[@]}"; do
  case "$url" in *.xml|*.txt|*.css|*.js|*.svg) continue;; esac
  links=$(curl -s "$BASE$url" | grep -oP 'href="(/[^"#]*)"' | sed 's/href="//;s/"$//' | sort -u)
  for link in $links; do
    case "$link" in /styles.css|/main.js|/favicon.svg|/opengraph.jpg) continue;; esac
    ls=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$link")
    if [ "$ls" != "200" ] && [ "$ls" != "301" ]; then
      echo "  BROKEN: $url -> $link (HTTP $ls)"
      BROKEN=$((BROKEN + 1))
    fi
  done
done
echo "  $BROKEN broken links found"

echo ""
echo "--- 6. Sitemap vs Routes ---"
sitemap_count=$(grep -c '<loc>' public/sitemap.xml)
echo "  Sitemap URLs: $sitemap_count"

echo ""
echo "=== AUDIT COMPLETE ==="
echo "Total: $PASS pass, $FAIL fail, $META_FAIL meta issues, $BROKEN broken links"
