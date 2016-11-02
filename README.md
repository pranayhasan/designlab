# WEBAPP INSTALLATION

The code is not based on any server based language. So we can use any server of choice. I have provided instructions for an Apache server. But exact similar process can be used for any other alternative like NGINX or Python.

Installing Apache\
```sudo apt-get install apache2```\
Installing Webapp
1. Unpack the tar file attached below.
2. Copy all the contents to the web front folder. Generally it is a www folder located at /var/www. Thus all your content will now be inside /var/www/designlab
3. Rename the designlab folder to any desired name.
4. Start the apache server by typing in terminal the following "sudo service apache2 start"
5. In the browser type localhost/designlab or when accessing from other computers, type the <ip_address>/designlab (remember to replace designlab with folder name if you renamed it)

The above process has been verified in Ubuntu 12.04/14.04 . Other unix based systems will have similar commands.
