from django.contrib import admin

from datas.models import Song

# @admin.register(Song)
class SongAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'duration', 'lyrics')
    search_fields = ['name']
    # list_editable = ('name',)


admin.site.register(Song, SongAdmin)
