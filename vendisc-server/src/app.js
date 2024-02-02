const Koa = require("koa");
const staticFiles = require("koa-static");
const path = require("path");
const router = require("./routes");
const koaBody = require("koa-body");
const ERROR = require('./config/error.json');
const response = require('./utils/response');
const ReqError = require('./utils/ReqError');

global.ReqError = ReqError;

const SERVER_PORT = 3000;
const app = new Koa();

app.use(async (ctx, next) => {
    try {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'lid, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        /* jwt verify */
        await next();
    } catch (error) {
        console.log(error)
        ctx.body = error instanceof ReqError ? response.error(error.message, error.errors, error.code) : response.error(`Unexpected error`);
    }
})

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../public/files'),
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024 * 1024
    }
}))

app.use(router.routes());
app.use(router.allowedMethods());

app.use(staticFiles(path.join(__dirname, '../public')))

app.listen(SERVER_PORT, () => {
    console.log(`Server on ${SERVER_PORT}`);
});

