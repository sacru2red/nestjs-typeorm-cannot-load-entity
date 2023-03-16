# RUN
```sh
npm run start:dev
# http://localhost:50001/notice/notices
```

# Error 1
```
[Nest] 20020  - 2023. 03. 16. 오전 11:52:19   ERROR [GET /notice/notices] undefined
EntityMetadataNotFoundError: No metadata for "Notice" was found.
    at DataSource.getMetadata (C:\Users\user-name\Desktop\svn\api-v2\node_modules\typeorm\data-source\DataSource.js:295:19)
    at get metadata [as metadata] (C:\Users\user-name\Desktop\svn\api-v2\node_modules\typeorm\repository\Repository.js:15:40)
    at Repository.createQueryBuilder (C:\Users\user-name\Desktop\svn\api-v2\node_modules\typeorm\repository\Repository.js:32:53)
    at NoticeService.paginatePublic (C:\Users\user-name\Desktop\svn\api-v2\dist\src\notice\notice.service.js:35:14)
    at NoticeController.notices (C:\Users\user-name\Desktop\svn\api-v2\dist\src\notice\notice.controller.js:49:41)
    at C:\Users\user-name\Desktop\svn\api-v2\node_modules\@nestjs\core\router\router-execution-context.js:38:29
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async C:\Users\user-name\Desktop\svn\api-v2\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\user-name\Desktop\svn\api-v2\node_modules\@nestjs\core\router\router-proxy.js:9:17
```