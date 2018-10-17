FROM php:7.1.12-apache

COPY ./docker/config/default.conf /etc/apache2/sites-available/000-default.conf
COPY ./docker/config/php.ini /usr/local/etc/php/

ENV TZ=Europe/Oslo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install composer
RUN cd /usr/src && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Enable mod_rewrite
RUN a2enmod rewrite
RUN a2enmod headers

RUN apt-get update && apt-get install -y zlib1g-dev sqlite3

# Install PHP extensions
RUN docker-php-ext-install zip
