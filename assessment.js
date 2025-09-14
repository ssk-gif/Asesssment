'use strict';
const userNameInput = document.getElementById('user-name')
const assessmentButton = document.getElementById('assessment')
const resultDivision = document.getElementById('result-area')
const tweetDivision = document.getElementById('tweet-area')

assessmentButton.addEventListener(
  'click',
  () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }

    //TODO　診断喧嘩表示エリアの作成
    resultDivision.innerText = ' '; //表示エリアdivの中身を空にする。<div id="result-area"></div>
    const heading = document.createElement('h3') //<h3></h3>
    heading.innerText = '診断結果'; //<h3>診断悔過</h3>
    resultDivision.appendChild(heading); // <div id="rsulst-area"><h3>診断結果</h3></div>

    const paragraph = document.createElement('p'); // <p></p>
    const result = assessment(userName);//診断結果の文章
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);

//ツイートエリアの作成
tweetDivision.innerText =''; //ツイートエリアの中身を空にする。
const anchor = document.createElement('a');//aタグの（HTMLエレメント）作成
const hrefValue = 'https://twitter.com/internet/tweet?button_hashtag=' + 
     encodeURIComponent('あなたのいいところ') +
     '&ref_src=twsrc%5Etfw';

   // aタグに属性と追加
     anchor.setAttribute('href',hrefValue);//hrefを追加
     anchor.setAttribute('class','twitter-hashtag-button');//Class属性を追加
     anchor.setAttribute('data-text', result);// data-text属性を追加 
     //aタグに挟まれる文章を設定
     anchor.innterText = 'Tweet #あなたのいいところ'; // innerTextはタグの内側の内容の文章を設定できる
     // ツイートエリアの子要素として追加
     tweetDivision.appendChild(anchor);

     // widget.jsを読み込む
    const script = document.createElement('script');// スクリプトタグをつくる
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');//SRC属性と追加
    //ツイートエリアの子要素として追加
    tweetDivision.appendChild(script);
  }
);

const answers = [
'###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残りま。',
'###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
'###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
'###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
'###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
'###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
'###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
'###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
'###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
'###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
'###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
'###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
'###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
'###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
'###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
'###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
//全文字のコード番号を取得してそれを足し合わせる。
let sumOfCharCode = 0;
for (let i = 0; i < userName.length; i++){
  sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
}

//配列の要素数でわったあまりを計算することで、配列の添え字の範囲の数に収まる
const index = sumOfCharCode % answers.length;
//添字の文書を配列から取り出す
const unFinishedText = answers[index];
const result = unFinishedText.replaceAll('###userName###' , userName);
//結果を返す
return result;
}

//テストを行う関数
function test(){
  console.log ('診断結果の文章のテスト')

  //太郎さんの場合
console.log('太郎')
console.assert(
  assessment('太郎')===
  '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部位を名前に書き替えるしょりが正しくありません。'
);

//次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
    '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
    '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  
  console.log('診断結果の文章のテスト終了');

  console.log('同じ名前なら、同じ結果を出力することのテスト')
  
    console.log('太郎');
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('次郎');
  console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('花子');
  console.assert(
    assessment('花子') === assessment('花子'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
  console.log('同じ名前なら、同じ結果を出力することのテスト終了')
}
  test();
