$(document).ready(function(){

	$('#result').submit(function(e){
		

		var res = {};
		$.ajax({
			url: $('#result').attr('action'),
			type: 'get',
			data: $('#result').serialize(),
			
		}).done(function(response) {
			
			var result = $('#result').serialize().split('&');
			//put the result of the submit in an object
			for (var i in result){
				var value = result[i].split('=')[0];
				var key = result[i].split('=')[1];
				
				i = value;
				res[i] = key;
			}
			//calculate the score 
			var london = 0, marrakesh = 0, moscow = 0, munich = 0, rio = 0;
			for(var k in res){
				switch(k){
					case 'gender':
						if(res[k]=="man"){
							london++;
							moscow++;
							munich++;
						}
						else if(res[k]=="woman"){
							marrakesh++;
							rio++;
						}
						break;
					case 'eyecolor':
						switch(res[k]){
							case 'white':
								moscow++;
								break;
							case 'grey':
								london++;
								break;
							case 'green':
								munich++;
								break;
							case 'blue':
								rio++;
								break;
							case 'red':
								marrakesh++;
								break;
						}
						break;
					case 'height':
						if(res[k] <=160){
							rio++;
						}
						if(160 <res[k] <=170){
							marrakesh++;
						}
						if(170 <res[k] <=190){
							london++;
						}
						if(190 <res[k] <=210){
							moscow++;
						}
						if(210 <res[k] <=250){
							munich++;
						}
					break;
					case 'planet':
						switch(res[k]){
							case 'mars':
								rio++;
							break;
							case 'moon':
								london++;
							break;
							case 'neptune':
								moscow++;
							break;
							case 'venus':
								marrakesh++;
								munich++;
							break;

						}
					break;
					case 'name':
						//search the letters that are in the name and add them to the score as integer 
						var letter=[];
						for(var i=0; i< res[k].length ;i++){
							letter.push(res[k][i]);
						}
						
						city = ['rio','london','moscow','marrakesh','munich'];
						
						for(var i=0; i< city.length ; i++){
							
							for(var j=0; j< letter.length ;j++){
								
								if(city[i].search(letter[j]) > -1 ){
									switch(city[i]){
										case 'rio':
											rio+=city[i].search(letter[j]);
										break;
										case 'london':
											london+=city[i].search(letter[j]);
										break;
										case 'moscow':
											moscow+=city[i].search(letter[j]);
										break;
										case 'marrakesh':
											marrakesh+=city[i].search(letter[j]);
										break;
										case 'munich':
											munich+=city[i].search(letter[j]);
										break;
									}
								}
							}
						}
					break;
				}
			}

			//show max result
			var result1={"rio":rio,"london":london,"moscow":moscow,"marrakesh":marrakesh,"munich":munich};
			var max = Math.max(rio,london,moscow,marrakesh,munich);
			for (var i in result1){
				if(result1[i]== max){
					//result
					$(".quiz").fadeOut();
					$(".result").show();
					//change background-image depending of the result
					switch(i){
						case 'marrakesh':
							$('body').css("background","url('css/img/marrakesh.jpg') no-repeat center fixed");
						break;
						case 'munich':
							$('body').css("background","url('css/img/munich.jpg') no-repeat center fixed");
						break;
						case 'london':
							$('body').css("background","url('css/img/london.jpg') no-repeat center fixed");
						break;
						case 'rio':
							$('body').css("background","url('css/img/rio.jpg') no-repeat center fixed");
						break;
						case 'moscow':
							$('body').css("background","url('css/img/moscow.jpg') no-repeat center fixed");
						break;
					}
					//put the first letter of the name on the logo with the choosen color
					for (var key in res) {

						if(key=="name"){
							$('.first-letter').append('<span class="color-first-letter" >'+ res[key].slice(0,1).toUpperCase()+'</span>');
						}
    				
						if(key=="color"){
							var color = res[key].replace(/%23/g,"#");
							$('.answer').html('<div>The international city that fits you is:<span style="color:'+color +'"> '+ i.substring( 0, 1 ).toUpperCase() +  i.substring( 1 ) +'</span></div>');
							$('.color-first-letter').css("color", color);
						}
					}
				}
			}

		});
		
		return false;
		
		
	});
	

	

});



