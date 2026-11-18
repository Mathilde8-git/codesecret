export const COLORS = Object.freeze(["rouge","bleu","vert","jaune","orange","violet"]);
export const CODE_LENGTH = 4;
export const MAX_ATTEMPTS = 10;

export function validateProposal(proposal){
  if(!Array.isArray(proposal)||proposal.length!==CODE_LENGTH)return "La proposition doit contenir exactement quatre couleurs.";
  if(proposal.some(c=>typeof c!=="string"||!COLORS.includes(c)))return "Couleur non autorisée. Utilisez rouge, bleu, vert, jaune, orange ou violet.";
  return null;
}

// Compte d'abord les positions exactes, puis les occurrences restantes.
export function scoreProposal(proposal,secret){
  const error=validateProposal(proposal);if(error)throw new TypeError(error);
  if(validateProposal(secret))throw new TypeError("Le code secret est invalide.");
  let wellPlaced=0;const remainingSecret=[],remainingProposal=[];
  for(let i=0;i<CODE_LENGTH;i++){
    if(proposal[i]===secret[i])wellPlaced++;
    else{remainingSecret.push(secret[i]);remainingProposal.push(proposal[i]);}
  }
  let misplaced=0;
  for(const c of remainingProposal){const i=remainingSecret.indexOf(c);if(i!==-1){misplaced++;remainingSecret.splice(i,1);}}
  return {wellPlaced,misplaced};
}

export function createGame(fixedCode){
  const secret=fixedCode?[...fixedCode]:Array.from({length:CODE_LENGTH},()=>COLORS[Math.floor(Math.random()*COLORS.length)]);
  if(validateProposal(secret))throw new TypeError("Le code secret doit contenir quatre couleurs autorisées.");
  let history=[],status="playing";
  function submit(proposal){
    if(status!=="playing")return {ok:false,error:"La partie est terminée. Lancez une nouvelle partie."};
    const error=validateProposal(proposal);if(error)return {ok:false,error};
    const feedback=scoreProposal(proposal,secret);
    history.push({proposal:[...proposal],...feedback});
    if(feedback.wellPlaced===CODE_LENGTH)status="won";
    else if(history.length===MAX_ATTEMPTS)status="lost";
    return {ok:true,attempt:history.length,...feedback,status};
  }
  function getState(){return {status,attemptsUsed:history.length,attemptsRemaining:MAX_ATTEMPTS-history.length,history:history.map(x=>({proposal:[...x.proposal],wellPlaced:x.wellPlaced,misplaced:x.misplaced}))};}
  return {submit,getState};
}