// JavaScript Document

//search for songs relating to searchInput using Echonest API
//input: searchInput
//type: artist, song, or album
function searchSongs(input, type, aliasArr){
	
	//variables
	var url;
	var searchType = '';
	var typeStr;
	
	//include name to listNames and alias to echonest format
	var listNames = aliasArr.join(', ');
	if(listNames == ''){
		listNames = input;
	} else{
		listNames = input + ', ' + listNames;
	}
	listNames = listNames.replace(/,\s/g, ',');
	listNames = listNames.replace(/\s/g, '+');
	listNames = listNames.split(',');
	console.log(listNames);
	
	
	//set search type
	if(type == 'artist'){
		searchType = 'artist/song';
		typeStr = 'artist';
	} else if(type == 'song'){
		searchType = 'artist/song';
		typeStr = 'title';
	} else{
		searchType = 'album';
	}
	
	//search based on type
	switch(searchType){
		case 'artist/song':
			
			//clear previous song results
			$('#song_table tbody').html('');
			
			//get song list for each name
			for(var i = 0; i < listNames.length; i++){
				url = 'http://developer.echonest.com/api/v4/song/search?api_key=KKIZOFIEWNN9075BD&' + typeStr + '=' + listNames[i] + '&results=100&bucket=audio_summary&callback=?';
				$.get(url, function(json) {
					console.log(json);
					
					//get list of songs
					var listSongs = json.response.songs;
	//				console.log(listSongs);
					
					//declare variables
					var songHTML = '';
					var song;
					
					//retrieve information on each song
					for(var i = 0; i < listSongs.length; i++){
						song = listSongs[i];
						
						//get song info
						var artistName = song.artist_name;
						var trackTitle = song.title;
						var trackTime = song.audio_summary.duration;
						
						//convert trackTime to minutes
						trackTime = trackTime / 60;
						trackTime = trackTime.toFixed(2);
						
						//convert trackTitle
						trackTitle = trackTitle.replace(/_/g, "'");
						
						//add song to song result list
						songHTML = '<tr id="track_' + i + '">' +
										'<td class="add" onclick="addingTrack(this)"></td>' +
										'<td class="track_name">' + trackTitle + '</td>' +
										'<td class="artist">' + artistName + '</td>' +
										'<td class="album"></td>' +
										'<td class="time">' + trackTime + '</td>' +
									'</tr>';
									
						$('#song_table tbody').append(songHTML);
						
	/*					//change to echonest format
						artistName = artistName.replace(/\s/g, '+');
						trackTitle = trackTitle.replace(/\s/g, '+');
						
						url = 'http://developer.echonest.com/api/v4/song/identify?api_key=KKIZOFIEWNN9075BD&artist=' 
									+ artistName + '&title=' + trackTitle;
						console.log(url);
	*//*					$.get(url, function(data){
							 console.log(data);
	*//*					songHTML = '<tr id="searched_song">' +
										'<td class="add"></td>' +
										'<td class="track_name">' + song.title + '</td>' +
										'<td class="artist">' + song.artist_name + '</td>' +
										'<td class="album">Album</td>' +
										'<td class="time">Time</td>' +
									'</tr>';
	*//*					});
	*/				}
			});
		}
	}
}