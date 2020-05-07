<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div v-if="isColumnInEdit" class="flex items-center mb-2 font-bold">
        <input
          type="text"
          :value="column.name"
          class="flex flex-grow"
          @keyup.enter="updateColumnName($event, 'name')"
        />
      </div>
      <div v-else class="flex flex-grow items-center mb-2 font-bold">
        <div class="flex-grow">{{ column.name }}</div>
        <div class="flex flex-row buttons">
          <div class="px-1">
            <AppIcon icon="edit" style="color:green" @click="openColumnEdit">Edit</AppIcon>
          </div>
          <div class="px-1">
            <AppIcon icon="trash" style="color:red" @click.stop="openDeleteModal({ columnIndex })">
              Delete
            </AppIcon>
          </div>
        </div>
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />
        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Add new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from './ColumnTask'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  components: { ColumnTask, AppDrag, AppDrop },
  mixins: [movingTasksAndColumnsMixin],
  data () {
    return {
      isColumnInEdit: false
    }
  },
  methods: {
    pickUpColumn (event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
    },
    createTask (event, tasks) {
      this.$store.commit('CREATE_TASK', { tasks, name: event.target.value })
      event.target.value = ''
    },
    deleteColumn (columnIndex) {
      this.$store.commit('DELETE_COLUMN', { columnIndex })
    },
    openDeleteModal (transferData) {
      this.$router.push({
        name: 'delete',
        params: {
          type: 'column',
          columnIndex: transferData.columnIndex,
          taskIndex:
            transferData.taskIndex === undefined ? 0 : transferData.taskIndex
        }
      })
    },
    updateColumnName (event, key) {
      this.$store.commit('UPDATE_COLUMN_NAME', {
        column: this.column,
        key,
        value: event.target.value
      })
      this.isColumnInEdit = false
    },
    openColumnEdit () {
      this.isColumnInEdit = true
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.buttons{
  text-align: right;
}
</style>
