// JavaScript Document

$(document).ready(function(){
	//set searchField default placeholder
	var selectedTxt = $(".search_options option:selected").text();
	$(".searchField").attr("placeholder", selectedTxt + "...");
	
	//when enter pushed in searchField
	$('.searchField').keypress(function(event){
		if(event.which == '13'){
			event.preventDefault();
			$('.searchButton').click();
		}
	});
	
	//when searchButton clicked
	$('.searchButton').click(function(){
//		alert("button clicked");
		var searchInput = $.trim($('.searchField').val()).toTitleCase();
		selectedTxt = $(".search_options option:selected").text();
		if(searchInput){
//			alert("search input valid");
			$('#artist_name').text(searchInput.toTitleCase());
			
			var searchStr = selectedTxt == 'Song Title' ? 'song' : selectedTxt == 'Album Name' ? 'album' : selectedTxt;
			
//			alert('searchStr: ' + searchStr);
			
			$.getJSON('http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + searchInput + ' ' + searchStr + ' music' + '&srprop=wordcount|size&format=json&callback=?', function(json){
				console.log(json);
//				alert("found alternatives");
				
				var searchResults = json.query.search;
//				alert(searchResults[0].hasOwnProperty('title'));
				var mostLikelyResult = searchResults[0];
//				alert("length search results: " + searchResults.length);
				for(var i = 1; i < searchResults.length; i++){
//					alert("in loop");
/*					alert("search result " + i + ': ' + searchResults[i].title + '\n' + 
						'word count: ' + searchResults[i].wordcount + '\n' + 
						'size: ' + searchResults[i].size + '\n' + 
						'most likely: ' + mostLikelyResult.title + '\n' + 
						'word count: ' + mostLikelyResult.wordcount + '\n' + 
						'size: ' + mostLikelyResult.size);
*/					if((mostLikelyResult.wordcount < searchResults[i].wordcount) &&
						(mostLikelyResult.size < searchResults[i].size)){
//						alert("searchResults: " + searchResults[i].title);
//						alert("MOST LIKELY: word count = " + mostLikelyResult.wordcount + ' size = ' + mostLikelyResult.size + '\n CURRENT SEARCH RESULT: word count = ' + searchResults[i].wordcount + ' size = ' + searchResults[i].size);
						mostLikelyResult = searchResults[i];
					}
				}
				
				//search MediaWiki API using most likely result title
				$.getJSON('http://en.wikipedia.org/w/api.php?action=parse&page=' + mostLikelyResult.title + '&prop=text&format=json&callback=?', function(json) {
//					alert("rewikisearch");
					$('#info').html(json.parse.text['*']);
					
//					alert("before alias check");
//					alert($('#info').has('td.nickname').length !== 0);
					
					//clear html of related_names
					$('#related_names').html('');
					
					//get related names if info has field
					if($('#info').find('td.nickname').length !== 0){
						$('#related_names').html($('#info td.nickname'));
//						alert("contains alias names");
					}
					
					//get additional related names if found
					if($('#info').find('table.infobox').length !== 0){
						$('#info table.infobox').each(function(){
							if($(this).prev().not('div.topicon').length !== 0){
								var moreNames = '';
								$('tr td span[lang]', this).each(function(){
									moreNames += $(this).text() + ', ';
								});
								$('#related_names td').append('<br>\n' + moreNames);
//								console.log('more names: ' + moreNames);
							}
							if($(this).prev().not('div.topicon').length == 0){
								var names = $('tr th', this).first().text();
//								console.log($('tr th', this).first().html());
								names = names.replace(/\n/g, ', ');
								$('#related_names td').append('<br>\n' + names);
//								console.log('names: ' + names);
							}
						});
					}
					
//					console.log('related names:' + $('#related_names').html());
//					console.log('related names: ' + $('#related_names').text());
					
					//removes duplicates if found
					if($('#related_names').html().toLowerCase().indexOf(searchInput.toLowerCase()) !== -1){
//						console.log($('#related_names').text().toLowerCase());
						var regexInput = new RegExp(searchInput.toLowerCase(), 'g');
						var relatedNames = $('#related_names').text();
//						console.log('new html:' + relatedNames);
						relatedNames = relatedNames.replace(/\n/g, ', ');
						var checkMatch = relatedNames.toLowerCase().split(', ');
						relatedNames = relatedNames.split(', ');
						
						//index of removed alias
						var index = checkMatch.indexOf(searchInput.toLowerCase());
//						console.log(index);
						relatedNames.splice(index, 1);
						index = relatedNames.indexOf('');
						relatedNames.splice(index, 1);
						
						//get length of aliases
						var len = relatedNames.length;
						
						//group names by 3
						var arrRelatedNames = [];
						var groupIndex = 0;
						for(var i = 0; i < len; i += 3){
							var group = relatedNames.slice(i, i+3).join(', ');
							arrRelatedNames[groupIndex] = group;
							groupIndex++;
						}
						relatedNames = arrRelatedNames.join('<br>');
//						console.log(relatedNames);
//						console.log($('#related_names').html());
						$('#related_names td').html(relatedNames);
					}
					
					$('#info').html($('#info p').first());
					
					//replaces links
					if($('#info').find('a').length !== 0){
						$('#info a').each(function(){
							$(this).replaceWith($(this).text());
						});
//						alert("contains links");
					}
					
					//removes pron if info contains field
					if($('#info').find('span.nowrap').length !== 0){
						$('#info span.nowrap').remove();
//						alert("has pron fields");
					}
					
//					alert("before lang span check");
//					alert($('#info span lang'));
//					alert($('#info').find('span[lang]').length !== 0);
					
					//removes rest of span that are not lang
					if($('#info').find('span').length !== 0){
//						alert("has spans");
						$('#info span').not('[lang]').remove();
//						alert("removed spans");
					}
//					alert("sup check");
//					alert($('#info').find('sup').length !== 0);
					
					//removes sup
					if($('#info').find('sup').length !== 0){
						$('#info sup').remove();
//						alert("contains sup");
					}
					
//					alert("before check");
//					alert("info text: \n" + $('#info').text());
					
					//checks if info contains any '( , ' or '(; '
					if($('#info p').text().match(/\(\s,\s/)){
						$('#info p').html($('#info p').html().replace(/\(\s,\s/g, '\('));
					} else if($('#info p').text().match(/\(\;\s/)){
						$('#info p').html($('#info p').html().replace(/\(\;\s/g, '\('));
					}
				});
//				alert("parsed txt");
			});
		}
	});
});