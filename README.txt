DIRECTORY SEARCH FIX

Replace ONLY the existing fetchEntityRows() function in:
    lib/directory.ts

Reason:
The NHP import is successful (30,273 entities + 30,273 locations).
The website's filtered search is timing out inside search_directory_entities().
This replacement bypasses that RPC and reads directory_entities directly.

DO NOT:
- run the hospital import again
- delete the imported hospitals
- change Supabase SQL/RPC
- change app/directory/page.tsx

After replacing the function:
1. Save lib/directory.ts
2. In the terminal press Ctrl+C
3. Run: npm run dev
4. Open: http://localhost:3000/directory?category=hospitals
5. Test Hospitals and a search such as Apollo.

The replacement keeps the existing fetchEntityRows signature and existing
normalizeRow() / DirectoryListing pipeline.
