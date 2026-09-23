package soa.service;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class GatewayService {

    DiscoveryClient DC;

    public GatewayService(DiscoveryClient DC) {
        this.DC = DC;
    }

    private String getServiceUrl(String serviceName) {
        List<ServiceInstance> instances = DC.getInstances(serviceName);
        if (instances.isEmpty()) {
            return null;
        }
        return instances.get(0).getUri().toString();
    }

    // GET request forwarding
    public ResponseEntity<String> invokeGet(String serviceName, String endpoint) {
        String baseUrl = getServiceUrl(serviceName);
        if (baseUrl == null) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"message\":\"Service not available: " + serviceName + "\"}");
        }
        String url = baseUrl + "/" + endpoint;
        System.out.println("Gateway → GET " + url);

        try {
            RestClient client = RestClient.create();
            String response = client.get()
                    .uri(url)
                    .retrieve()
                    .body(String.class);
            return ResponseEntity.ok(response);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }

    // POST request forwarding
    public ResponseEntity<String> invokePost(String serviceName, String endpoint, Object data) {
        String baseUrl = getServiceUrl(serviceName);
        if (baseUrl == null) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"message\":\"Service not available: " + serviceName + "\"}");
        }
        String url = baseUrl + "/" + endpoint;
        System.out.println("Gateway → POST " + url);

        try {
            RestClient client = RestClient.create();
            String response = client.post()
                    .uri(url)
                    .header("Content-Type", "application/json")
                    .body(data)
                    .retrieve()
                    .body(String.class);
            return ResponseEntity.status(201).body(response);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }

    // PUT request forwarding
    public ResponseEntity<String> invokePut(String serviceName, String endpoint, Object data) {
        String baseUrl = getServiceUrl(serviceName);
        if (baseUrl == null) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"message\":\"Service not available: " + serviceName + "\"}");
        }
        String url = baseUrl + "/" + endpoint;
        System.out.println("Gateway → PUT " + url);

        try {
            RestClient client = RestClient.create();
            String response = client.put()
                    .uri(url)
                    .header("Content-Type", "application/json")
                    .body(data)
                    .retrieve()
                    .body(String.class);
            return ResponseEntity.ok(response);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }

    // DELETE request forwarding
    public ResponseEntity<String> invokeDelete(String serviceName, String endpoint) {
        String baseUrl = getServiceUrl(serviceName);
        if (baseUrl == null) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"message\":\"Service not available: " + serviceName + "\"}");
        }
        String url = baseUrl + "/" + endpoint;
        System.out.println("Gateway → DELETE " + url);

        try {
            RestClient client = RestClient.create();
            String response = client.delete()
                    .uri(url)
                    .retrieve()
                    .body(String.class);
            return ResponseEntity.ok(response);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }
}
