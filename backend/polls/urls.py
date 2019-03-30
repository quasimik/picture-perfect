from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    # path('word/get/') # get random word
    # path('word/get/<int:length>/<float:freq>/') # get random word, restricted by length and minimum freq
    path('game/create/', views.game_create, name="game_create") # start new game
    path('game/<int:pk>/', views.game_get, name="game_get") # get game status
    path('game/<int:pk>/create_team/', views.game_create_team, name="game_create_team") # create new team in game
    path('game/<int:pk>/change_target/<str:word>/', views.game_change_target, name="game_change_target") # change target word
    path('team/<int:pk>/', views.team, name="team") # get status of all users in team
    path('player/<int:pk>/', views.player, name="player") # get player status
    path('player/<int:pk>/switch_team/<int:team_pk>/', views.player_switch_team, name="player_switch_team") # switch team
    path('player/<int:pk>/change_name/<str:name>/', views.player_change_name, name="player_change_name") # change name
    path('player/<int:pk>/update_word/<str:word>/', views.player_update_word, name="player_update_word") # update played word in game
    # path('')

    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
