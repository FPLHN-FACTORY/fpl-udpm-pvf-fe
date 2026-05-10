#!/bin/bash

# Script deploy nhanh lên Vercel
# Sử dụng: ./deploy.sh hoặc bash deploy.sh

echo "🚀 Starting deployment process..."

# Kiểm tra xem có thay đổi chưa commit không
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes. Please commit them first."
    echo ""
    echo "Run these commands:"
    echo "  git add ."
    echo "  git commit -m 'Your commit message'"
    echo "  git push origin main"
    exit 1
fi

# Kiểm tra branch hiện tại
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Build test
echo "🔨 Testing build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin $CURRENT_BRANCH

if [ $? -ne 0 ]; then
    echo "❌ Push failed!"
    exit 1
fi

echo "✅ Pushed to GitHub successfully!"
echo ""
echo "🎉 Deployment initiated!"
echo "Vercel will automatically build and deploy your changes."
echo "Check your deployment status at: https://vercel.com/dashboard"
echo ""
echo "Your site will be available at:"
echo "  Production: https://your-project.vercel.app"
echo "  Preview: https://your-project-git-$CURRENT_BRANCH.vercel.app"
