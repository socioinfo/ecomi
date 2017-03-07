# ecomi
## sphinx ディレクトリ
* インストールドキュメントが入っています。sphinx で記述されており、 html, epub, pdf 形式など作成可能です。
* とりあえずみたければ `sphinx/_build/html/index.html` をブラウザで開けば閲覧できます。

### sphinx 理解のための資料
* [Welcome to PyCON JP Sphinx Tutorial's documentation!](http://www.usaturn.net/pyconjp/) このページは google 検索ではなかなかでてきません。なんも知らないところから始めるのなら最適。
* [Sphinx-Users.jp](http://www.sphinx-doc.org/ja/stable/) 制作しているメンバーは上と同じと思いますが網羅的で最初はとっつきにくいです。

#Installation
### Environment
- OS X
- homebrew

### install python
```sh
brew install python
```
### install pip
```sh
easy_install pip
```
### nstall Sphinx
```sh
pip install Sphinx
```

# Run
open sphinx/_build/html/index.html in your browser

# Auto build
### setup environment outbuild
```sh
cd sphinx/
make setup-auto-build
```
### run auto build
```sh
cd sphinx
make auto-build
```
