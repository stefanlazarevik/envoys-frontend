export default function ({ store, redirect }) {
    if (store.$auth.user) {
        let rules = store.$auth.user.rules ?? [];
        if (rules.length === 0) {
            return redirect('/')
        }
    }
}