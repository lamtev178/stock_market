from __future__ import annotations

from typing import TYPE_CHECKING
import uuid
import time

subscribed_users = []

if TYPE_CHECKING:
    import fastapi

    from server.models import client_messages
    from server.ntpro_server import NTProServer


async def subscribe_market_data_processor(
        server: NTProServer,
        websocket: fastapi.WebSocket,
        message: client_messages.SubscribeMarketData,
):
    from server.models import server_messages
    print("subscribe_market_data_processor")
    subscription_id = uuid.uuid4()
    subscribed_users.append(subscription_id)
    return server_messages.SuccessInfo(message_type=1, subscription_id=subscription_id)


async def unsubscribe_market_data_processor(
        server: NTProServer,
        websocket: fastapi.WebSocket,
        message: client_messages.UnsubscribeMarketData,
):
    from server.models import server_messages
    print("unsubscribe_market_data_processor")
    global subscribed_users
    subscribed_users = list(filter(lambda user : (user != message.subscription_id) ,subscribed_users))
    return server_messages.SuccessInfo(message_type=2)


async def place_order_processor(
        server: NTProServer,
        websocket: fastapi.WebSocket,
        message: client_messages.PlaceOrder,
):
    from server.models import server_messages

    # TODO ...

    return server_messages.SuccessInfo()


async def cancel_order_processor(
        server: NTProServer,
        websocket: fastapi.WebSocket,
        message: client_messages.PlaceOrder,
):
    from server.models import server_messages

    # TODO ...

    return server_messages.CancelOrder()


async def market_data_update(
        server: NTProServer,
        websocket: fastapi.WebSocket,
        message: client_messages.PlaceOrder,
):
    from server.models import server_messages
    print("market_data_update")
    return server_messages.MarketDataUpdate()
