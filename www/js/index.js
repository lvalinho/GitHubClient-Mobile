$(document).ready(function(){
    document.addEventListener('deviceready', function(){
        getRepos();
    });

    $('.ui-input-clear').click(function(){
        $('#search_list').hide();
        $('#user_info').hide();
    });

    $('#search_btn').click(function(e){
        e.preventDefault();

        var search_html = '';
        var user_html = '';
        var username = $('#search_input').val();
        console.log('searching user: ' + username);

        var user_url = 'https://api.github.com/users/' + username;
        var repo_url = 'https://api.github.com/users/' + username + '/repos';

        $.ajax({
            url: repo_url,
            dataType: 'jsonp',
            success: function(response){

                $.ajax({
                    url: user_html,
                    datatype: 'jsonp',
                    success: function(data){
                        user_html + '<h3><img="'+data.avatar_url+'" class="thumbnail" /></h3><div style="clear: both;"></div><br/><br/>' + 
                                    '<a href="'+data.html_url+'" targe="_blank">'+data.name+'<a>';
                        $("#user_info").html(user_html);
                    }
                });

                $.each(response.data, function(){
                    search_html += '<li>' + 
                                   '<h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1>' +
                                   '<p>By '+this.owner.login+'</p>';
                });
                $('#search_list').append(search_html);
                $('#search_list').listview('refresh');
            }
        });
    })
});

//Get repos for home screen
function getRepos(){
    var html = '';

    $.ajax({
        url: 'https://api.github.com/repositories',
        dataType: 'jsonp',
        success: function(response){
            $.each(response.data, function(i, item){
                if (i < 10){
                    html += '<li>' +
                            '<img class="thumbnail" src="'+this.owner.avatar_url+'" />' +
                            '<h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1>' +
                            '<p>By ' + this.owner.login + '</p>' + 
                            '</li>';
                }
            });
        $('#repo_list').append(html);
        $('#repo_list').listview('refresh');
        }
    });

    
}