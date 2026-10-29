package soa.service;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GatewayService {

    private final DiscoveryClient DC;

    public GatewayService(DiscoveryClient DC) {
        this.DC = DC;
    }

    public String getServiceUrl(String serviceName) {
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
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"error\":\"Service Unavailable\",\"message\":\"Service not registered with Eureka: " + serviceName + "\"}");
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
        } catch (HttpServerErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (ResourceAccessException e) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"error\":\"Service Unavailable\",\"message\":\"Cannot connect to " + serviceName + " at " + baseUrl + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"status\":\"error\",\"error\":\"Internal Gateway Error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }

    // POST request forwarding
    public ResponseEntity<String> invokePost(String serviceName, String endpoint, Object data) {
        String baseUrl = getServiceUrl(serviceName);
        if (baseUrl == null) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"error\":\"Service Unavailable\",\"message\":\"Service not registered with Eureka: " + serviceName + "\"}");
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
        } catch (HttpServerErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (ResourceAccessException e) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"error\":\"Service Unavailable\",\"message\":\"Cannot connect to " + serviceName + " at " + baseUrl + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"status\":\"error\",\"error\":\"Internal Gateway Error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }

    // PUT request forwarding
    public ResponseEntity<String> invokePut(String serviceName, String endpoint, Object data) {
        String baseUrl = getServiceUrl(serviceName);
        if (baseUrl == null) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"error\":\"Service Unavailable\",\"message\":\"Service not registered with Eureka: " + serviceName + "\"}");
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
        } catch (HttpServerErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (ResourceAccessException e) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"error\":\"Service Unavailable\",\"message\":\"Cannot connect to " + serviceName + " at " + baseUrl + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"status\":\"error\",\"error\":\"Internal Gateway Error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }

    // DELETE request forwarding
    public ResponseEntity<String> invokeDelete(String serviceName, String endpoint) {
        String baseUrl = getServiceUrl(serviceName);
        if (baseUrl == null) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"error\":\"Service Unavailable\",\"message\":\"Service not registered with Eureka: " + serviceName + "\"}");
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
        } catch (HttpServerErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (ResourceAccessException e) {
            return ResponseEntity.status(503).body("{\"status\":\"error\",\"error\":\"Service Unavailable\",\"message\":\"Cannot connect to " + serviceName + " at " + baseUrl + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"status\":\"error\",\"error\":\"Internal Gateway Error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }

    // Aggregated Eureka Service Discovery status
    public Map<String, Object> getAggregatedStatus() {
        Map<String, Object> status = new HashMap<>();
        List<String> services = DC.getServices();
        Map<String, Object> serviceMap = new HashMap<>();
        for (String s : services) {
            List<ServiceInstance> instances = DC.getInstances(s);
            Map<String, Object> info = new HashMap<>();
            info.put("instanceCount", instances.size());
            info.put("instances", instances.stream().map(i -> i.getUri().toString()).toList());
            info.put("status", instances.isEmpty() ? "DOWN" : "UP");
            serviceMap.put(s, info);
        }
        status.put("eurekaStatus", "CONNECTED");
        status.put("services", serviceMap);
        status.put("totalServicesRegistered", services.size());
        status.put("timestamp", java.time.Instant.now().toString());
        return status;
    }
}


