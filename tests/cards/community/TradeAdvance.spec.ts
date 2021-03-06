import { expect } from "chai";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { TradeAdvance } from "../../../src/cards/community/TradeAdvance";
import { Game, GameOptions } from "../../../src/Game";
import { setCustomGameOptions } from "../../TestingUtils";
import { OrOptions } from "../../../src/inputs/OrOptions";

describe("TradeAdvance", function () {
    let card : TradeAdvance, player : Player, game : Game;

    beforeEach(function() {
        card = new TradeAdvance();
        player = new Player("test", Color.BLUE, false);
        
        const gameOptions = setCustomGameOptions({coloniesExtension: true}) as GameOptions;
        game = new Game("foobar", [player, player], player, gameOptions);
    });

    it("Should play", function () {
        card.play(player, game);
        expect(player.megaCredits).not.to.eq(0);

        if (game.interrupts.length > 0) {
            const orOptions = game.interrupts.pop()!.playerInput as OrOptions;
            const options = orOptions.options[0] as OrOptions;
            options.cb();
        }

        game.colonies.forEach((colony) => expect(colony.trackPosition <= 1).to.eq(true));
    });
});
