#!/bin/bash

# helper tool to ingest map data files

# requires:
# a download of the map data from http://smarterroads.org/dataset/detail/26 , named "map-data.json"
# install of freely available https://github.com/eerimoq/asn1tools
# a copy of the official j2735 asn file, which you must purchase from sae
ASN=$HOME/j2735.asn

set -e
#set -x

mkdir -p map-data

i=0
jq -r '.[].msg' map-data.json | while read line
do
	# convert from base64 to hex, remove line breaks
	echo "$line" | base64 -d - | xxd -plain | tr -d '\n' > map-data/$i.hex
	i=$(($i + 1))
done

(cd map-data; ls *.uper) | while read file
do
	# this is the magic file one has
	# alas it still doesn't work?
	asn1tools convert -i uper -o jer "$ASN" MapData "$(cat map-data/$file)" > map-data/${file%.hex}.json

	# going back to manually running these hex files for now
done