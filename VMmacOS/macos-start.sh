# This script runs before SSH in macOS instances

# Setting the time zone
sudo systemsetup -settimezone "Asia/Ho_Chi_Minh"

# Install the tools you need to use

brew tap majd/repo
brew install ipatool
brew install proxychains-ng
#sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ca.crt
mv transfer.sh /usr/local/bin/transfer && chmod +x /usr/local/bin/transfer