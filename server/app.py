import fastapi
from server import ntpro_server
from starlette.middleware.cors import CORSMiddleware

api = fastapi.FastAPI(title="Market")
server = ntpro_server.NTProServer()

api.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@api.get('/')
async def get():
    return "Hello world"


@api.websocket('/ws/')
async def websocket_endpoint(websocket: fastapi.WebSocket):
    await server.connect(websocket)

    try:
        await server.serve(websocket)
    except fastapi.WebSocketDisconnect:
        server.disconnect(websocket)
