from django.contrib import admin

from .models import *

admin.site.register(Word)
admin.site.register(Game)
admin.site.register(Team)
admin.site.register(Player)
admin.site.register(Question)
admin.site.register(Choice)
