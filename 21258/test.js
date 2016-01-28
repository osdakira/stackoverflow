$(function () {
  "use strict";
  $('#gallery').each(function () {

    var $container = $(this),
        $loadMoreButton = $('#load-more'), // 追加ボタン
        addItemCount = 16,                 // 一度に表示するアイテム数
        addedd = 0,                        // 表示済みのアイテム数
        allData = [];                      // すべての JSON データ



    // JSON を取得し、initGallery 関数を実行
    $.getJSON('./data/content.json', initGallery);

    // ギャラリーを初期化する
    function initGallery (data) {

      // 取得した JSON データを格納
      allData = data;

      // 最初のアイテムを表示
      addItems();

      // 追加ボタンがクリックされたら追加で表示
      $loadMoreButton.on('click', addItems);
    }

    // アイテムを生成しドキュメントに挿入する
    function addItems () {

      var elements = [],
      // 追加するデータの配列
          slicedData = allData.slice(addedd, addedd + addItemCount);

      // slicedData の要素ごとに DOM 要素を生成
      $.each(slicedData, function (i, item) {
        var itemHTML =
          '<div class="col-sm-6">'+
          '<h4>' + item.title + '</h4>'+
          '<div class="embed-responsive embed-responsive-' + item.aspect + '">' +
          '<iframe class="embed-responsive-item" src="' + item.url + '"></iframe>' +
          '</div>' +
          '</div>';
        elements.push($(itemHTML).get(0));
      });

      // DOM 要素の配列をコンテナーに挿入
      $container.append(elements);

      // 追加済みアイテム数の更新
      addedd += slicedData.length;

      // JSON データがすべて追加し終わっていたら追加ボタンを消す
      if (addedd < allData.length) {
        $loadMoreButton.show();
      } else {
        $loadMoreButton.hide();
      }
    }
  });
});
