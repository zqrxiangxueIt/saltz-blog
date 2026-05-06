'use strict';

// Filter hide:true posts from index page
hexo.extend.generator.register('index', function (locals) {
  var config = this.config;
  var perPage = config.index_generator.per_page;
  var visible = locals.posts.toArray()
    .filter(function (p) { return !p.hide; })
    .sort(function (a, b) { return b.date - a.date; });
  var totalPage = Math.ceil(visible.length / perPage);
  var result = [];

  for (var i = 0; i < totalPage; i++) {
    result.push({
      path: i === 0 ? 'index.html' : 'page/' + (i + 1) + '/index.html',
      layout: ['index', 'home'],
      data: {
        posts: { data: visible.slice(i * perPage, (i + 1) * perPage) },
        current: i + 1,
        total: totalPage,
        per_page: perPage
      }
    });
  }

  return result;
});

// Filter hide:true posts from archive page
hexo.extend.generator.register('archive', function (locals) {
  var visible = locals.posts.toArray()
    .filter(function (p) { return !p.hide; })
    .sort(function (a, b) { return b.date - a.date; });

  return [{
    path: 'archives/index.html',
    layout: ['archive'],
    data: {
      posts: visible,
      archive: true
    }
  }];
});
