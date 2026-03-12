# ──────────────────────────────────────────────
# Backend Dockerfile
#
# Requires a completed Maven build:
#   mvn -f pom.xml -DskipTests package
#
# Source: backend/target/backend-*.jar
# The jar already includes:
#   - Spring Boot backend
#   - api-java (generated interfaces/DTOs)
#   - frontend jar (Angular static files in META-INF/resources)
# ──────────────────────────────────────────────
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

# Copy the fat-jar produced by the root Maven build
COPY backend/target/backend-*.jar app.jar

# Spring Boot port
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]



