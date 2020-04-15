export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn (transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveTask ({ fromColumnIndex, fromTaskIndex }) {
      const fromColumn = this.board.columns[fromColumnIndex].tasks
      const toColumn = this.board.columns[this.columnIndex].tasks
      const toTaskIndex = this.taskIndex === undefined ? toColumn.length : this.taskIndex

      this.$store.commit('MOVE_TASK', {
        fromColumn,
        toColumn,
        fromTaskIndex,
        toTaskIndex
      })
    },
    moveColumn ({ fromColumnIndex }) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    }
  }
}
