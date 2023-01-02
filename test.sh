# git directory `test` should exist
# remote origin for `test` is https://github.com/garevna/test
# it may be another repo on github

FOLDER=$(pwd)

cd ../test
git rm * -r

cd $FOLDER

yarn build

wait

cp dist/* ../test -r

wait

cd ../test

echo 'Project directory changed:'

pwd

git status

echo 'Start commiting...'
git add .

echo =============================
echo Enter the comment for commit:
echo =============================

read message
git commit -m $message

wait

git push origin gh-pages

wait

echo 'Finish to deploy '
