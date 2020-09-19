import { CardName } from "../../CardName";
import { Game } from "../../Game";
import { SelectSpace } from "../../inputs/SelectSpace";
import { ISpace } from "../../ISpace";
import { Player } from "../../Player";
import { Resources } from "../../Resources";
import { SpaceBonus } from "../../SpaceBonus";
import { SpaceType } from "../../SpaceType";
import { TileType } from "../../TileType";
import { CardType } from "../CardType";
import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";

export class MetallicAsteroid implements IProjectCard {
    public cost: number = 13;
    public tags: Array<Tags> = [Tags.SPACE, Tags.EVENT];
    public cardType: CardType = CardType.EVENT;
    public name: CardName = CardName.METALLIC_ASTEROID;
    public play(player: Player, game: Game) {
      player.titanium++;
      game.increaseTemperature(player, 1);
      game.addResourceDecreaseInterrupt(player, Resources.PLANTS, 4);

      return new SelectSpace(
          "Select space for special city tile",
          game.board.getAvailableSpacesForCity(player),
          (space: ISpace) => {
            game.addTile(player, SpaceType.LAND, space, {
              tileType: TileType.METALLIC_ASTEROID,
              card: this.name
            });
            space.adjacency = {bonus: [SpaceBonus.STEEL]}
            return undefined;
          }
      );
    }
}
