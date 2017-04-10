declare -a series=("01" "02" "03" "04" "05" "06" "07" "08" "09" "10" "11" "12")
for item in ${series[@]};do
# url="https://s3.amazonaws.com/hubway-data/2016${item}-hubway-tripdata.zip"
# 	echo "fetching $url..."
# 	curl -O $url

# unzip "2016${item}-hubway-tripdata.zip"


fil="2016${item}-hubway-tripdata.csv"
echo "running $fil..."

# cat $fil | tail -n+2 >> 2016-hubway-tripdata.csv
# if [[ $item == "01" ]]; then

	mongoimport -h localhost -d hubway -c rides --file $fil --type csv --headerline

# else
# 	mongoimport -h localhost -d hubway -c rides --file $fil --type csv --fields "tripduration,starttime,stoptime,start_station_id,start_station_name,start_station_latitude,start_station_longitude,end_station_id,end_station_name,end_station_latitude,end_station_longitude,bikeid,usertype,birth_year,gender"
# fi

done