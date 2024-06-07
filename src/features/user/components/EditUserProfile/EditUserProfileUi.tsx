import { Button } from '@/components/Button/Button'

export const EditUserProfileUi = ({ handleLogOut, handleDeleteUser, disabled }: EditUserProfileUiProps) => {
  return (
    <>
      <Button
        variants={{ color: 'destructive', form: 'fullWidth' }}
        onClick={handleLogOut}
        className="mt-16"
        disabled={disabled}
      >
        Log Out
      </Button>

      <Button
        variants={{ color: 'apocalyptic', form: 'fullWidth' }}
        onClick={handleDeleteUser}
        className="mt-4"
        disabled={disabled}
      >
        Delete My Account
      </Button>
    </>
  )
}

type FallbackEditUserProfileUiProps = {
  handleLogOut?: never
  handleDeleteUser?: never
  disabled: true
}

type InteractiveEditUserProfileUiProps = {
  handleLogOut: () => void
  handleDeleteUser: () => void
  disabled?: never
}

type EditUserProfileUiProps = FallbackEditUserProfileUiProps | InteractiveEditUserProfileUiProps
