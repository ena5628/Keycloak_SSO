# Keycloakを使ったSSO検証

## 概要
SSOの流れをハンズオンを通して学習したいと思い実施しました。

## 前提条件
dockerのインストールが必要

## 環境
- OS:Windows
- ターミナル:wsl
- 環境:docker

## 構成
ブラウザ<br>
 ↓<br>
アプリA（ログイン）<br>
 ↓<br>
Keycloak（認証）<br>
 ↓<br>
アプリB（ログイン不要で入れる）<br>

## 実施内容

### 1.dockerでKeycloakを立てる

#### dockerがインストールされてるか確認
```wsl
$ docker --version
Docker version 29.5.3, build xxxxxxx
```
> 表示されなければdockerをインストールしてください

#### keycloakを立てる
```wsl
$ docker run -p 8080:8080 quay.io/keycloak/keycloak start-dev
```
- docker run   : コンテナ起動
- -p 8080:8080 : 自分のPCとコンテナのポートをつなぐ
- quay.io/keycloak/keycloak : Dockerイメージ（使うアプリ）
- start-dev    : 開発モードで起動

#### Keycloakにアクセスしてみる（ http://localhost:8080 ）

![ログイン画面](Images/login01.png)
> 管理者ユーザーでログインする必要があるみたい

#### 管理者ユーザーを起動時に環境変数として渡す
```wsl
$ docker run -p 8080:8080 \
-e KEYCLOAK_ADMIN=admin \
-e KEYCLOAK_ADMIN_PASSWORD=admin \
quay.io/keycloak/keycloak start-dev
```
> これで起動時に自動的に管理者ユーザーが作成される

#### 再度アクセスしてみる（ http://localhost:8080 ）

![ログイン画面](Images/login02.png)
> 先ほど引数に渡した管理者ユーザー名とパスワードでログイン

#### ログインに成功するとこのような画面に進めるはず
![ログイン画面](Images/login03.png)
> ブラウザの警告が出ますが検証用なので無視して大丈夫です（ローカル環境で動作しているため基本大丈夫）

### 2.Realmの作成

Keycloakでは、Realmという単位でユーザーや認証設定を管理する。

今回は検証用として `test-realm` を作成する。

> 手順：領域を管理する（Manage realms）　→　領域の作成（Create Realm）

![Realm作成画面](Images/realm01.png)

このようになれば成功
![Realm作成画面](Images/realm02.png)
> `test-realm`がcurrent realmになる

## 課題・詰まった点


## 学んだこと


## 参考資料
