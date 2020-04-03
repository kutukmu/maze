const { Engine, Render, Runner, World, Bodies } = Matter;
const cells = 3;
const width = 600;
const height = 600;
const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, {
    isStatic: true
  }),
  Bodies.rectangle(0, height / 2, 40, height, {
    isStatic: true
  }),

  Bodies.rectangle(width / 2, height, width, 40, {
    isStatic: true
  }),
  Bodies.rectangle(width, height / 2, 40, height, {
    isStatic: true
  })
];

const shuffle = arr => {
  let counter = arr.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

World.add(world, walls);

const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));
const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepTroughcell = (row, column) => {
  if (grid[row][column]) {
    return;
  }

  grid[row][column] = true;

  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row, column - 1, "left"],
    [row, column + 1, "right"],
    [row + 1, column, "bottom"]
  ]);
};

stepTroughcell(1, 1);
