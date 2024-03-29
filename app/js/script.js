$(document).ready(function(){
    if ($("#twitterWidget").length) {

                var userTweetsTout = {
                    'config' : {
                        wrapper : '#twitterWidget', 
                        listedInfo : '.userTweets',
                        json:'pch_twitter_response_2.json',
                    },

                    'init' : function(config){

                        $.extend(userTweetsTout.config, config);
                        userTweetsTout.getContent(userTweetsTout.config.json);
                    },
                    'getContent' : function(json) {
                        //console.log(json);
                        $.getJSON(json, function (data) {
                            $.each(data, function(index) { 
                            var userData = {};
                            userData = data.statuses;
                            //console.dir(userData);
                            userTweetsTout.buildMarkup(userData);
                            });
                        });

                    },

                    'buildMarkup' : function (userData){
                        var i, key, html, name, text, img;

                        html = '<ul>';

                        for (i=0; userData[i] ; i++) {
                            for(key in userData[i]) {
                                userData[i][$.trim(key)]=userData[i][key];
                            }
                            
                            name = userData[i].user.screen_name;
                            text = userData[i].text;
                            img = userData[i].user.profile_image_url;
                            
                            html += '<li>';
                            html += '<div class="userImg"><img src=" '+ img +' " alt="user profile pic" width="45" height="45" /> </div>';
                            html += '<div class="userTxt"><h4 class="name">' + name +'</h4> <p>'+ text +'</p></div> ';
                            html += '</li>';
                        }

                        html += '</ul>';

                        $('.userTweets').html(html);
                        userTweetsTout.refreshTweets();
                    },
                    'refreshTweets' : function (){
                        var 
                            listItems = $('.userTweets').find("li"),
                            listItems_len = listItems.length,
                            max = 4;

                            listItems.each(function(index) {
                                if ( (index+1) > max ) {
                                    $(this).hide(0);
                                }
                            });

                      
                        $('.refreshIcon').on('click', function(e){
                            e.preventDefault();
                            var howManyMore = listItems_len - max;
                            listItems.eq(howManyMore).prevAll(max).hide();
                            listItems.eq(max -1).nextAll().show();
                        });
                    }

                };
                // lets start it up
                userTweetsTout.init();

    }
});