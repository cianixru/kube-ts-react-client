#! /bin/bash
# exit script when any command ran here returns with non-zero exit code
set -e

cd ~/repo/k8s

export APP_NAME="kube-ts-react-client"

envsubst <~/repo/k8s/values-circleci.yaml >~/repo/k8s/values-circleci.yaml.out
mv ~/repo/k8s/values-circleci.yaml.out ~/repo/k8s/values-circleci.yaml

envsubst <~/repo/k8s/cicd-config.yaml >~/repo/k8s/cicd-config.yaml.out
mv ~/repo/k8s/cicd-config.yaml.out ~/repo/k8s/cicd-config.yaml

echo "initialising helm..."
helm init --client-only

helm --kubeconfig ./cicd-config.yaml list

echo "installing/upgrading new release..."

helm upgrade --install --wait  --force --kubeconfig ./cicd-config.yaml ${APP_NAME} . -f ./values-circleci.yaml

helm --kubeconfig ./cicd-config.yaml list

echo "deployment completed..."
