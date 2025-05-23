import { Gamemode } from "@serenityjs/protocol";

import { GamemodeEnum, TargetEnum } from "../enums";
import { Player } from "../../entity";

import type { World } from "../../world";

const register = (world: World) => {
  // Register the about command
  world.commandPalette.register(
    "gamemode",
    "Sets a player's gamemode",
    (registry) => {
      // Set the permissions of the command
      registry.permissions = ["serenity.operator"];

      // Create an overload for the command
      registry.overload(
        {
          gamemode: GamemodeEnum,
          target: [TargetEnum, true]
        },
        (context) => {
          // Get the targets from the context
          const targets = context.target.validate()
            ? context.target.result
            : [context.origin instanceof Player ? context.origin : null];

          // Check if there are no targets
          if (!targets || targets.length === 0)
            throw new Error("No targets matched the selector.");

          // Get the gamemode from the context
          const gamemode = context.gamemode.result as string;

          // Create an array to hold the log messages
          const logs: Array<string> = [];

          // Loop through all the targets
          for (const target of targets) {
            // Check if the target is not a player
            if (!target || !(target instanceof Player)) continue;

            switch (gamemode) {
              case "s":
              case "survival": {
                target.gamemode = Gamemode.Survival;
                break;
              }

              case "c":
              case "creative": {
                target.gamemode = Gamemode.Creative;
                break;
              }

              case "a":
              case "adventure": {
                target.gamemode = Gamemode.Adventure;
                break;
              }

              case "sp":
              case "spectator": {
                target.gamemode = Gamemode.Spectator;
                break;
              }

              default: {
                throw new TypeError("Invalid gamemode specified!");
              }
            }

            // Add the log message
            logs.push(
              `§7Successfully updated §u${target.username}'s§7 gamemode!§r`
            );
          }

          // Return the success message
          return { message: logs.join("\n") };
        }
      );
    },
    () => {}
  );
};

export default register;
