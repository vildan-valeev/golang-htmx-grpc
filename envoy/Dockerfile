#FROM envoyproxy/envoy:latest
#RUN apt-get update
#COPY envoy.yaml /etc/envoy.yaml
#CMD /usr/local/bin/envoy -c /etc/envoy.yaml


FROM envoyproxy/envoy:v1.22.0

COPY envoy.yaml /etc/envoy/envoy.yaml

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml -l trace --log-path /tmp/envoy_info.log
