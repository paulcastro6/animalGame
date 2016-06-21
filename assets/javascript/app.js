var animals = ['dog', 'tiger', 'penguin', 'snake', 'moose', 'wolf'];

    $('#addAnimal').on('click', function() {
        var value = $('#animalInput').val();
        animals.push(value);
         $('#animalInput').val("");
        renderButtons();
        return false;
    });

    $(document).on('click', '.animalButton', function() {
        
        var animal = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";
       $('#animalLayout').empty();

       $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
               $("body").animate({ scrollTop: $(document).height() }, "fast");
                var results = response.data;
                    for (var i = 0; i < results.length; i++) {
                        
                        var animalDiv = $('<span id="animalDiv">');
                        var p = $('<p id="rating">');
                        p.text("Rating: " + results[i].rating);
                        var animalImage = $('<img>', {
                            class: 'animalImage',
                            attr: { 'data-state': 'active',
                                    'data-still': results[i].images.original_still.url,
                                    'data-animate': results[i].images.original.url,
                                    'src': results[i].images.fixed_width.url
                                }
                        });
                        
                        $(p).appendTo(animalDiv);
                        $(animalImage).appendTo(animalDiv);

                        $('#animalLayout').prepend(animalDiv);
                    }
            });
    });

    $(document).on('click', '.animalImage', function(){
        var state = $(this).data('state');
        if(state == 'still'){
                $(this).data('state', 'animate');
                $(this).attr('src', $(this).data('animate'));
            }else{
                $(this).data('state', 'still');
                $(this).attr('src', $(this).data('still'));
            }
    });

    function renderButtons() { 

        
        $('#buttonLayout').empty();

        
        for (var i = 0; i < animals.length; i++) {
            
            var button = $('<button>', {
                text: animals[i],
                class: 'animalButton'
            });

            $('#buttonLayout').append(button);
        }

    }

    renderButtons();