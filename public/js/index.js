//toutes les variables
var sauter=false;
var score = parseInt(localStorage.getItem('score'));
var ouvert=false;
var gainGenere = 0;
var luigiEstActif=false;
var vieCarapaceVerte=10;

//class Bonus régit le nombre de bonus, leur prix en fonction du nombre d'achat et leur multiplicateur d'effet


 $('document').ready( function(){
     console.log('renvoie'+localStorage.getItem('username'))
     console.log( $('.username>span'))
     afficheCompteur();
     $('.username>span').html("Nom d'utilisateur : " + localStorage.getItem('username'))
 })
var bowser= new Personnage('Bowser',2,1000,'Bowser est le boss ultime du jeu')

//instance de la class Bonus, pieceEtoile multiplie le gain de pièce par deux
var pieceEtoile= new Bonus(300,0);

function multiplicateurDeGain(){
   if (score>=Math.round(pieceEtoile.prixBonus))
   {
        score-=Math.round(pieceEtoile.prixBonus)
        pieceEtoile.calculPrixBonus()
        pieceEtoile.calculNombreBonus()
        pieceEtoile.calculEffetBonus()
   }
   $('#prixPieceEtoile').html(' X '+Math.round(pieceEtoile.prixBonus));
   afficheCompteur()
}



//instance de la class Bonus, champignon multiplie les dégats effectués par mario par deux
var champignon= new Bonus(500,0);

function multiplicateurDegat(){

   if (score>=Math.round(champignon.prixBonus)){
        score-=Math.round(champignon.prixBonus);
        champignon.calculPrixBonus();
        champignon.calculNombreBonus();
    }
    $('#prixChampignon').html('X : '+Math.round(champignon.prixBonus));
    $('#inventaireNombreChampignon').html('X : '+Math.round(champignon.nombreBonus));
    afficheCompteur()
}

//instance de la class Bonus, luigi est un auto cliqueur qui fait gagner 400 points
var luigi= new Bonus(100,0);
function achatAutoGain(){
    if ((score>=Math.round(luigi.prixBonus)) && (!luigiEstActif)){
        score-=Math.round(luigi.prixBonus);
        luigi.calculPrixBonus();
        luigi.calculNombreBonus();
        luigiEstActif=true;
        autoGain();
        normal();

    }
    $('#prixLuigi').html('X : '+Math.round(luigi.prixBonus));
    afficheCompteur()
}

function autoGain(){
    if(gainGenere<40)
    {
        $('#MarioPoids').css('visibility',"visible");
        $('#pieceDessous').css('visibility',"hidden");
        setTimeout(ajoutDuGain, 100);

    }
    else{
        luigiEstActif=false;
        gainGenere=0;
        $('#MarioPoids').css('visibility',"hidden");
        $('#pieceDessous').css('visibility',"hidden");
    }

}
function ajoutDuGain(){

    score+=10*luigi.effetBonus
    gainGenere+=1;
    afficheCompteur()
    $('#pieceDessous').css('visibility',"visible");
    setTimeout(autoGain, 200);



}

// changement de spray quand il saute
function saut()
{
    console.log("je saute")

    if (!sauter){
        if (luigiEstActif){
            $('#icon').attr('src','public/images/LuigiSaut.png');
        }
        else
        {
            $('#icon').attr('src','public/images/sticker-mario-saut.png');
        }
        sauter = !sauter;
        compteur()
        $('#piece').css('visibility',"visible");
        setTimeout(normal, 200);

    }

}
//changement de spray quand il ne saute pas
function normal()
{
    if (luigiEstActif){
        $('#icon').attr('src','public/images/Luigi.png');
    }
    else{
        $('#icon').attr('src','public/images/MarioNSMBUDeluxe.png');
    }

    $('#piece').css('visibility',"hidden");
    sauter=false;

}
//ajoute + 1 au compteur de pièces et l'affiche ensuite
function compteur(){
    score += 1 * pieceEtoile.effetBonus;

    afficheCompteur()
}
//affiche le nombre de pièce
function afficheCompteur(){
    $('#compteurChiffre').html("X "+ score);
}

//quand la boite mystère est cliquée, un onglet apparait sur la gauche avec le nomre de bonus pret pour le combat
function apparitionSac(){
    if (!ouvert){
        $('#sac').css('visibility','visible');
        ouvert=!ouvert;
    }
    else{
        $('#sac').css('visibility','hidden');
        ouvert=!ouvert;
    }

}
//quand l'icone bowser  est cliquée,  le html change pour laisser place au combat
function combat()
    {
        $('#contientMarioEtPiece').hide();
        $('#boutique').hide();
        $('#ContientCombat').show();
        $('#bonusCombat').show();
        $('#NombreChampignon').html(champignon.nombreBonus +' X ');
        setTimeout(glissadeCarapaceVerte,8000);

        bowser.calculDegat()

    }
//quand on clique sur bowser ça lui enlève des points de vies et quand il meurt ça affiche l'html d'avant
function cliqueContreBowser()
{
    console.log(bowser.pointDeVieDuPersonnage)
    if (bowser.pointDeVieDuPersonnage>0){

        bowser.calculPointDeVie()*champignon.effetBonus;
        $('#bowserVieIndicateur').html(bowser.pointDeVieDuPersonnage+' X ');

    }
    else
    {
        $('#boutique').show();
        $('#contientMarioEtPiece').show();
        $('#ContientCombat').hide();
        $('#bonusCombat').hide();


    }

}
// quand l'utilisateur clique sur le petit champignon en combat ça active le bonus qui double les dégats de marios
function bonusDeDegats()
{
    if(champignon.nombreBonus>0){
        champignon.calculNombreEnMoins();
        champignon.calculEffetBonus();
        $('#inventaireNombreChampignon').html('X : '+Math.round(champignon.nombreBonus));
        $('#NombreChampignon').html(Math.round(champignon.nombreBonus)+' X ');

    }

}

function glissadeCarapaceVerte()
{
    vieCarapaceVerte=10
    $('#carapaceVerte').show();
    $('#carapaceVerte').animate({left:'-55%'},5000)
    $('#carapaceVerte').animate({left:'0'},1)
    setTimeout(carapaceCacher,5000)
    setTimeout(glissadeCarapaceVerte,8000)

}

function carapaceCacher()
{
    $('#carapaceVerte').hide();
}

function cliqueCarapaceVerte(){
    vieCarapaceVerte-=1
    console.log(vieCarapaceVerte)
    verifierVieCarapaceVerte()
}

function verifierVieCarapaceVerte()
{
    if(vieCarapaceVerte<=0)
    {
        carapaceCacher()
    }

}