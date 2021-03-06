define([
  'backbone',
  'app',
  'apps/project/show/models',
  'apps/project/show/views'
], function(Backbone, app, Model, View) {

  return function(projectSlug) {

    var renderingLayout = app.request('layout:project', projectSlug);

    $.when(renderingLayout).done(function(projectLayout) {
      var layout = new View.Layout();
      projectLayout.contentRegion.show(layout);

      require(['entities/resource'], function() {
        var fetchingResources = app.request('resource:entities', projectSlug);

        $.when(fetchingResources).done(function(resources) {
          var resourcesView = new View.ResourceList({collection: resources});
          layout.resourceListRegion.show(resourcesView);
        });
      });

      require(['entities/language'], function() {
        var fetchingLanguages = app.request('language:entities', projectSlug);

        $.when(fetchingLanguages).done(function(languages) {
          var languagesView = new View.LanguageList({
            collection: languages,
            model: new Backbone.Model({
              count: languages.length
            }),
          });

          layout.languageListRegion.show(languagesView);

        });
      });
    })

    // require(['entities/project/model'], function() {
    //   var fetchingProject = app.request('project:entity', projectSlug);

    //   $.when(fetchingProject).done(function(project) {
    //     var projectView = new View.ProjectTitle({model: project});
    //     layout.projectTitleRegion.show(projectView);
    //   });
    // });


  }
});
