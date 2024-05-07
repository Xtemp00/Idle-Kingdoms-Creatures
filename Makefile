# Exemple de la compilation d'un programme en C++ avec g++
# g++ -o viewer src/viewer.cpp src/main.cpp -lSDL2 -lSDL2_ttf -lSDL2_image

# Variables
CC = g++
CFLAGS = -Wall -Wextra
LDFLAGS = -lSDL2 -lSDL2_ttf -lSDL2_image -lm -ljsoncpp -lSDL2_gfx
EXEC = Idle-KC
SRC = $(wildcard src/*.cpp)
OBJ = $(SRC:.cpp=.o)

# Règles
all: $(EXEC)

$(EXEC): $(OBJ)
	$(CC) -o $@ $^ $(LDFLAGS)

%.o: %.cpp
	$(CC) -o $@ -c $< $(CFLAGS)

clean:
	rm -f src/*.o

run: all
	./$(EXEC)

mrproper: clean
	rm -f $(EXEC)

valgrind: all
	valgrind --leak-check=full ./$(EXEC)	

build: check_dependencies $(EXEC)

check_dependencies:
	@echo "Vérification des dépendances..."
	@if ! pkg-config --exists jsoncpp; then \
		echo "Installation de JSONcpp..."; \
		sudo apt-get install libjsoncpp-dev; \
	fi