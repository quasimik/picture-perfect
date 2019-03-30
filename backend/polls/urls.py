from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    # path('word/get/') # get random word
    # path('word/get/<int:length>/<float:freq>/') # get random word, restricted by length and minimum freq
    path('game/create/') # start new game
    path('game/<int:pk>/') # get game status
    path('game/<int:pk>/change_target/<str:word>/') # change target word
    path('team/<int:pk>/') # get status of all users in team
    path('player/<int:pk>/') # get player status
    path('player/<int:pk>/switch_team/<int:team_pk>/') # switch team
    path('player/<int:pk>/change_name/<str:name>/') # change name
    path('player/<int:pk>/update_word/<str:word>/') # update played word in game
    # path('')

    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
