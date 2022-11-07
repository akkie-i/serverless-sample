## 事前準備

- npm の導入
- aws cli の導入
- aws アカウントの準備及び IAM の作成
- serverless の導入
- serverless の credentials 情報の生成

詳細は[こちら](https://zenn.dev/akkie1030/articles/serverless-tutorial-api-gateway-lambda)を参照

## セットアップ

```bash
npm install
```

## デプロイ

GitHub Actions か直接 CLI でデプロイできます

### GitHub Actions

[GitHub Actions で CI を構築](https://zenn.dev/akkie1030/articles/serverless-tutorial-api-gateway-lambda#github-actions-%E3%81%A7-ci-%E3%82%92%E6%A7%8B%E7%AF%89)を参考に GitHub への変数の登録、S3 へのファイル配置を完了させた上で `main`ブランチにプッシュ

```bash
git push origin main
```

### CLI でデプロイ

`serverless.yml`のコメントアウト部分を外してください。
[こちら](https://zenn.dev/akkie1030/articles/serverless-tutorial-api-gateway-lambda#config%2Fserverless-%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)を参考に `config/serverless`フォルダに `apikeys.yml`と `environment.yml`を作成してください。

上記完了させた上で以下のコマンドを実行

```bash
sls deploy --stage staging

# 丁寧に指定する場合以下
sls deploy \
--verbose \
--stage staging \
--aws-profile aws1-serverless-full-access-staging \
--region ap-northeast-1
```

## エンドポイント一覧

デプロイ後に `sls info`でエンドポイントとシークレットキーが取得できるので `****`のマスク部分は置換してください。

### Create

```bash
$ curl -X POST https://*****.execute-api.ap-northeast-1.amazonaws.com/staging/users \
-H "x-api-key: *****" \
--data '{ "name": "taro", "age": 20, "email": "text@example.com", "gender": "男"}'
```

### List

```bash
$ curl https://*****.execute-api.ap-northeast-1.amazonaws.com/staging/users \
-H "x-api-key: *****"
```

### Get

```bash
$ curl https://*****.execute-api.ap-northeast-1.amazonaws.com/staging/users/{id} \
-H "x-api-key: *****"
```

### Update

```bash
#$ curl -X PUT https://*****.execute-api.ap-northeast-1.amazonaws.com/staging/users/{id} \
-H "x-api-key: *****" \
--data '{ "name": "taro", "age": 999, "email": "text@example.com", "gender": "男"}'
```

### Delete

```bash
$ curl -X DELETE https://*****.execute-api.ap-northeast-1.amazonaws.com/staging/users/{id} \
-H "x-api-key: *****" \
```
