import test from "node:test";
import assert from "node:assert/strict";
import {COLORS,MAX_ATTEMPTS,createGame,scoreProposal,validateProposal} from "../game.js";

test("palette exacte et ordonnée",()=>assert.deepEqual(COLORS,["rouge","bleu","vert","jaune","orange","violet"]));
test("refuse une proposition incomplète ou inconnue",()=>{assert.match(validateProposal(["rouge","bleu"]),/exactement quatre/);assert.match(validateProposal(["rouge","bleu","vert","noir"]),/non autorisée/);});
test("exemple : 1 bien placée et 2 mal placées",()=>assert.deepEqual(scoreProposal(["rouge","vert","bleu","orange"],["rouge","bleu","vert","jaune"]),{wellPlaced:1,misplaced:2}));
test("les répétitions ne sont comptées qu'une fois",()=>assert.deepEqual(scoreProposal(["rouge","rouge","rouge","rouge"],["rouge","rouge","bleu","vert"]),{wellPlaced:2,misplaced:0}));
test("une proposition invalide ne consomme pas d'essai",()=>{const g=createGame(["rouge","bleu","vert","jaune"]);assert.equal(g.submit(["rouge","bleu"]).ok,false);assert.equal(g.getState().attemptsUsed,0);assert.equal(g.getState().history.length,0);});
test("victoire au dixième essai",()=>{const g=createGame(["rouge","bleu","vert","jaune"]);for(let i=0;i<MAX_ATTEMPTS-1;i++)assert.equal(g.submit(["violet","violet","violet","violet"]).status,"playing");const r=g.submit(["rouge","bleu","vert","jaune"]);assert.equal(r.status,"won");assert.equal(r.attempt,10);});
test("défaite après dix essais valides",()=>{const g=createGame(["rouge","bleu","vert","jaune"]);for(let i=0;i<MAX_ATTEMPTS;i++){const r=g.submit(["violet","violet","violet","violet"]);if(i===MAX_ATTEMPTS-1)assert.equal(r.status,"lost");}assert.equal(g.getState().attemptsUsed,10);});
test("la partie ne change plus après sa fin",()=>{const g=createGame(["rouge","bleu","vert","jaune"]);g.submit(["rouge","bleu","vert","jaune"]);const before=g.getState();assert.equal(g.submit(["violet","violet","violet","violet"]).ok,false);assert.deepEqual(g.getState(),before);});