// JavaScript Document

var skin;

//activates jplayer
$(document).ready(function(){
	//The playlist to be loaded
	//Test credited to BlackNRoll
    var myPlayList = [
                                {artist:"Opeth",name:"The Lepper Affinity",mp3:"http://www.heavy-music.ru/gothic/Opeth/(2001)%20-%20Blackwater%20Park/01.%20The%20Leper%20Affinity.mp3",cover:"http://4.bp.blogspot.com/_BJs8mlnXmKQ/Rvxqy5_SqqI/AAAAAAAAD9o/ZGMhNOIea2U/s320/Opeth+-+Blackwater+Park.jpg"},
                                {artist:"Opeth",name:"Bleak",mp3:"http://www.heavy-music.ru/dl.php?band=Opeth&album=(2001)%20-%20Blackwater%20Park&track=02.%20Bleak.mp3",cover:"http://4.bp.blogspot.com/_BJs8mlnXmKQ/Rvxqy5_SqqI/AAAAAAAAD9o/ZGMhNOIea2U/s320/Opeth+-+Blackwater+Park.jpg"},
                                {artist:"Opeth",name:"Harvest",mp3:"http://www.heavy-music.ru/dl.php?band=Opeth&album=(2001)%20-%20Blackwater%20Park&track=03.%20Harvest.mp3",cover:"http://4.bp.blogspot.com/_BJs8mlnXmKQ/Rvxqy5_SqqI/AAAAAAAAD9o/ZGMhNOIea2U/s320/Opeth+-+Blackwater+Park.jpg"},
                                {artist:"Opeth",name:"The Drapery Falls",mp3:"http://www.heavy-music.ru/dl.php?band=Opeth&album=(2001)%20-%20Blackwater%20Park&track=04.%20The%20Drapery%20Falls.mp3",cover:"http://4.bp.blogspot.com/_BJs8mlnXmKQ/Rvxqy5_SqqI/AAAAAAAAD9o/ZGMhNOIea2U/s320/Opeth+-+Blackwater+Park.jpg"},
                                {artist:"Opeth",name:"Dirge For November",mp3:"http://www.heavy-music.ru/gothic/Opeth/(2001)%20-%20Blackwater%20Park/05.%20Dirge%20For%20November.mp3",cover:"http://4.bp.blogspot.com/_BJs8mlnXmKQ/Rvxqy5_SqqI/AAAAAAAAD9o/ZGMhNOIea2U/s320/Opeth+-+Blackwater+Park.jpg"},
                                {artist:"Opeth",name:"The Funeral Portrait",mp3:"http://www.heavy-music.ru/gothic/Opeth/(2001)%20-%20Blackwater%20Park/06.%20The%20Funeral%20Portrait.mp3",cover:"http://4.bp.blogspot.com/_BJs8mlnXmKQ/Rvxqy5_SqqI/AAAAAAAAD9o/ZGMhNOIea2U/s320/Opeth+-+Blackwater+Park.jpg"},
                                {artist:"Opeth",name:"Patterns In The Ivy",mp3:"http://www.heavy-music.ru/gothic/Opeth/(2001)%20-%20Blackwater%20Park/07.%20Patterns%20In%20The%20Ivy.mp3",cover:"http://4.bp.blogspot.com/_BJs8mlnXmKQ/Rvxqy5_SqqI/AAAAAAAAD9o/ZGMhNOIea2U/s320/Opeth+-+Blackwater+Park.jpg"},
                        ];
                        
                        //New instance of jPlayerSkin
                        skin = new jPlayerSkin( '#jplayer_container' , myPlayList );
                        
                        //Start the player
                        skin.initialize();
						
                });
				

//when add in track list is clicked
function addingTrack(element){
	//get parent ID of li clicked
	var id = $(element).parent().get(0).id;
	var trackInfo = document.getElementById(id).childNodes;
	var artist_name = trackInfo[2].innerText;
	var track_title = trackInfo[1].innerText;
//	console.log(trackInfo[2].innerText);
//	console.log(track_title);
	skin.addTrack({artist:artist_name, name:track_title});
}

/*	
	$("#jquery_jplayer_1").jPlayer({
		ready: function(){
			$(this).jPlayer("setMedia",{
				m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
				oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
			});
		},
		swfPath: "/js",
		supplied: "mp3, m4a, oga"
	});
});
*/