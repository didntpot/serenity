import { Proto, Serialize } from "@serenityjs/raknet";
import { Uint8, VarInt, VarLong } from "@serenityjs/binarystream";

import { Packet, PlayerUpdateEntityOverridesType } from "../../enums";
import { PlayerUpdateEntityOverridesValue } from "../types";

import { DataPacket } from "./data-packet";

@Proto(Packet.PlayerUpdateEntityOverrides)
class PlayerUpdateEntityOverridesPacket extends DataPacket {
  @Serialize(VarLong) public uniqueActorId!: bigint;
  @Serialize(VarInt) public propertyIndex!: number;
  @Serialize(Uint8) public updateType!: PlayerUpdateEntityOverridesType;
  @Serialize(PlayerUpdateEntityOverridesValue, 0, "updateType")
  public value!: number | null;
}

export { PlayerUpdateEntityOverridesPacket };
