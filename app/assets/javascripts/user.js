$(function(){
  
  var user_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${user.name}</p>
               <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
              </div>`
  user_list.append(html);
}

function appendNoUser(MisMatch) {
  var html = `<p>
                <div class="chat-group-user__name">${MisMatch}</div>
              </p>`
  user_list.append(html);
  }

  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();
    $("#user-search-result").empty();
    var input = $('#user-search-field').val();
    if(input==""){
      return
    }

    $.ajax({
      url: '/users',
      type: "GET",
      data: { name: input },
      dataType: 'json'
    })

    .done(function(users){
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendNoUser("--Mis Match--")
      }
    })

    .fail(function(){
      alert('error');
    });
    return false;
  });

  var user_list_add = $("#chat-group-users");

  function appendUserAdd(user_name, user_id) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
               </div>`
    user_list_add.append(html);
  }

  $(document).on("click", ".chat-group-user__btn--add", function () {
    var user_name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    appendUserAdd(user_name, user_id);
    $(this).parent().remove();
  });

  $(document).on("click", ".js-remove-btn", function () {
    $(this).parent().remove();
  });
});