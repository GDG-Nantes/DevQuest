google-cloud-sdk/bin/gcloud config set app/use_appengine_api false
echo $GAE_KEY_FILE_CONTENT > file.key
echo "Authenticate with $GAE_SERVICE_ACCOUNT"
google-cloud-sdk/bin/gcloud auth activate-service-account $GAE_SERVICE_ACCOUNT --key-file file.key
echo "Deploying..."
google-cloud-sdk/bin/gcloud --project devquest2015 preview app deploy --version v2 --quiet dist/app.yaml
