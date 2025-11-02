# Etapa 1: build del proyecto con Maven
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copiar los archivos necesarios para Maven Wrapper
COPY mvnw .
COPY .mvn .mvn

# Dar permiso de ejecución al wrapper
RUN chmod +x mvnw

# Copiar el resto del proyecto
COPY pom.xml .
COPY src ./src

# Compilar el proyecto
RUN ./mvnw clean package -DskipTests

# Etapa 2: imagen final más liviana
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]

